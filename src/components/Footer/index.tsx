import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DiscordIcon, InstagramIcon, MediumIcon, TwitterIcon } from 'app/components/Icon'
import LanguageSwitch from 'app/components/LanguageSwitch'
import Typography from 'app/components/Typography'
import { Feature } from 'app/enums'
import { featureEnabled } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Container from '../Container'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()

  return (
    <div className="z-10 w-full">
      <Container maxWidth="7xl" className="px-6 pb-20 mx-auto">
        <div className="grid grid-cols-2 gap-10 pt-8 border-t md:grid-cols-3 lg:grid-cols-6 xs:px-6 border-dark-900">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start gap-2">
              <div className="">
                <Image
                  src="https://raw.githubusercontent.com/hootoshi/hootswap-interface/main/public/images/hoot.png"
                  alt="hoot logo"
                  width="200px"
                  height="200px"
                />
              </div>
              <Typography variant="h2" weight={700} className="tracking-[0.02em] scale-y-90 hover:text-high-emphesis">
                Hootswap
              </Typography>
            </div>
            <Typography variant="xs" className="text-low-emphesis">
              {i18n._(t`Our qommunity is building a  decentralized trading nest for the future of finance. Join
              us!`)}
            </Typography>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/followthehoot" target="_blank" rel="noreferrer">
                <TwitterIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://medium.com/@admin_70828" target="_blank" rel="noreferrer">
                <MediumIcon width={16} className="text-low-emphesis" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Products`)}
            </Typography>
            <Link href={featureEnabled(Feature.TRIDENT, chainId) ? '/farm' : '/farm'} passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`The Nest`)}
              </Typography>
            </Link>
            <Link href="/" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`The Incubator`)}
              </Typography>
            </Link>
          </div>
          <div className="flex flex-col gap-1 md:text-right lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Help`)}
            </Typography>
            <a
              href="https://medium.com/@admin_70828/hoot-a-birds-nest-for-launching-and-nurturing-projects-with-dex-capabilities-on-the-qom-ecosystem-3e588064bbad"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`What is Hoot?`)}
              </Typography>
            </a>
            <a href="https://t.me/hootfinance" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Telegram`)}
              </Typography>
            </a>
          </div>
          <div className="flex flex-col gap-1 text-right xs:text-right md:text-left lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Developers`)}
            </Typography>

            <a href="" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`GitHub(tba)`)}
              </Typography>
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <LanguageSwitch />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
