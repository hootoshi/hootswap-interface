import { BeakerIcon, GlobeIcon, SwitchVerticalIcon, TrendingUpIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, SUSHI_ADDRESS } from 'app/config/core-sdk'
import { RocketIcon, WalletIcon } from 'app/components/Icon'
import { Feature } from 'app/enums'
import { featureEnabled } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import { ReactNode, useMemo } from 'react'

export interface MenuItemLeaf {
  key: string
  title: string
  link: string
  icon?: ReactNode
}

export interface MenuItemNode {
  key: string
  title: string
  items: MenuItemLeaf[]
  icon?: ReactNode
}

export type MenuItem = MenuItemLeaf | MenuItemNode
export type Menu = MenuItem[]

type UseMenu = () => Menu
const useMenu: UseMenu = () => {
  const { i18n } = useLingui()
  const { chainId, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!chainId) return []

    const menu: Menu = []

    const trade = [
      {
        key: 'swap',
        title: i18n._(t`Swap`),
        link: '/swap',
      },
      {
        key: 'limit',
        title: i18n._(t`Limit order`),
        link: '/limit-order',
        disabled: !featureEnabled(Feature.LIMIT_ORDERS, chainId),
      },
    ]

    const liquidity = [
      {
        key: 'pool',
        title: i18n._(t`Pool`),
        link: '/pool',
      },
      {
        key: 'add-liquidity',
        title: i18n._(t`Add`),
        link: `/add/ETH/`,
      },
      // {
      //   key: 'remove-liquidity',
      //   title: i18n._(t`Remove`),
      //   link: '/remove',
      // },
      {
        key: 'migrate',
        title: i18n._(t`Migrate`),
        link: '/migrate',
        disabled: !featureEnabled(Feature.MIGRATE, chainId),
      },
      {
        key: 'import',
        title: i18n._(t`Import`),
        link: '/find',
      },
    ]

    if (featureEnabled(Feature.TRIDENT, chainId)) {
      menu.push({
        key: 'trade',
        title: i18n._(t`Trade`),
        icon: <SwitchVerticalIcon width={20} />,
        items: [
          {
            key: 'trident-swap',
            title: i18n._(t`Swap`),
            link: '/swap',
          },
          {
            key: 'limit',
            title: i18n._(t`Limit order`),
            link: '/limit-order',
            disabled: !featureEnabled(Feature.LIMIT_ORDERS, chainId),
          },
        ].filter((item) => !item.disabled),
      })

      const tridentLiquidity = {
        key: 'liquidity',
        title: i18n._(t`Liquidity`),
        icon: <BeakerIcon width={20} />,
        items: [
          {
            key: 'trident-pools',
            title: i18n._(t`Pools`),
            link: '/trident/pools',
          },
          {
            key: 'trident-create',
            title: i18n._(t`Create`),
            link: '/trident/create',
          },
        ],
      }

      if (featureEnabled(Feature.TRIDENT_MIGRATION, chainId)) {
        tridentLiquidity.items.push({
          key: 'trident-migrate',
          title: i18n._(t`Migrate`),
          link: '/trident/migrate',
        })
      }

      menu.push(tridentLiquidity)

      if (featureEnabled(Feature.AMM, chainId)) {
        menu.push({
          key: 'Legacy',
          title: i18n._(t`Legacy`),
          icon: <SwitchVerticalIcon width={20} />,
          items: liquidity.filter((item) => !item?.disabled),
        })
      }
    } else {
      menu.push({
        key: 'trade',
        title: i18n._(t`Trade`),
        icon: <SwitchVerticalIcon width={20} />,
        items: trade.filter((item) => !item?.disabled),
      })
      menu.push({
        key: 'liquidity',
        title: i18n._(t`Liquidity`),
        icon: <BeakerIcon width={20} />,
        items: liquidity.filter((item) => !item?.disabled),
      })
    }

    if (featureEnabled(Feature.LIQUIDITY_MINING, chainId)) {
      const farmItems = {
        key: 'farm',
        title: i18n._(t`Nest`),
        icon: <SwitchVerticalIcon width={20} className="rotate-90 filter" />,
        items: [
          {
            key: 'farm',
            title: i18n._(t`The Nest`),
            link: 'https://en.wikipedia.org/wiki/Nest#Birds',
          },
          {
            key: 'my-farms',
            title: i18n._(t`My Nest`),
            link: 'https://en.wikipedia.org/wiki/Egg',
          },
        ],
      }
      menu.push(farmItems)
    }

    const exploreMenu: MenuItemLeaf[] = []

    if (exploreMenu.length > 0) {
      menu.push({
        key: 'explore',
        title: i18n._(t`Explore`),
        items: exploreMenu,
        icon: <GlobeIcon width={20} />,
      })
    }

    let analyticsMenu: MenuItem = {
      key: 'analytics',
      title: i18n._(t`Analytics`),
      icon: <TrendingUpIcon width={20} />,
      items: [
        {
          key: 'dashboard',
          title: 'Dashboard',
          link: `/analytics`,
        },
        {
          key: 'tokens',
          title: 'Tokens',
          link: `/analytics/tokens`,
        },
        {
          key: 'pools',
          title: 'Pools',
          link: `/analytics/pools`,
        },
      ],
    }

    if (featureEnabled(Feature.BENTOBOX, chainId)) {
      analyticsMenu.items.push({
        key: 'farms',
        title: 'Farms',
        link: `/analytics/farms`,
      })
    }

    if (featureEnabled(Feature.BENTOBOX, chainId)) {
      analyticsMenu.items.push({
        key: 'bentobox',
        title: 'BentoBox',
        link: `/analytics/bentobox`,
      })
    }

    if (featureEnabled(Feature.ANALYTICS, chainId)) {
      menu.push(analyticsMenu)
    }

    if (account && chainId !== ChainId.ARBITRUM_NOVA) {
      const portfolio = {
        key: 'portfolio',
        title: i18n._(t`Portfolio`),

        icon: <WalletIcon width={20} />,
        items: [
          {
            key: 'account',
            title: 'Account',
            link: `/account?account=${account}`,
          },
        ],
      }

      if (featureEnabled(Feature.SUBGRAPH, chainId)) {
        portfolio.items.push({
          key: 'liquidity',
          title: 'Liquidity',
          link: `/account/liquidity?account=${account}`,
        })
      }

      menu.push(portfolio)
    }

    return menu.filter((el) => Object.keys(el).length > 0)
  }, [account, chainId, i18n])
}

export default useMenu
