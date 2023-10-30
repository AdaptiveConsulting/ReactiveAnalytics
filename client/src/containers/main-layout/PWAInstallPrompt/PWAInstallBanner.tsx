import React, { Dispatch, SetStateAction, useEffect } from "react"

import { CrossIcon } from "@/assets/icons"
import Environment from "@/system/environment"
import { isiOS, isMobileDevice } from "@/utils"

import { AppleInstallModal } from "./AppleInstallModal"
import {
  Banner,
  BannerText,
  CrossButton,
  InstallButton,
} from "./PWAPrompt.styles"
import { usePWABannerPrompt } from "./usePWABannerPrompt"

export enum PWABanner {
  Shown = "shown",
  Hidden = "hidden",
  NotSet = "notset",
  Installed = "installed",
}

interface InstallBannerProps {
  banner: string | null
  updateBanner: (state: PWABanner) => void
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const PWAInstallBanner: React.FC<InstallBannerProps> = ({
  banner,
  updateBanner,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [prompt, promptToInstall] = usePWABannerPrompt()

  const isHidden =
    banner !== PWABanner.Shown || (!prompt && !isiOS) || Environment.isPWA()

  useEffect(() => {
    if (prompt && banner === PWABanner.NotSet) {
      updateBanner(PWABanner.Shown)
    } else if (isiOS && banner === PWABanner.NotSet) {
      updateBanner(PWABanner.Shown)
    }
  }, [prompt, banner, updateBanner])

  useEffect(() => {
    const handler = () => {
      updateBanner(PWABanner.Installed)
    }

    window.addEventListener("appinstalled", handler)

    return () => window.removeEventListener("appinstalled", handler)
  }, [updateBanner])

  const closeBanner = () => {
    updateBanner(PWABanner.Hidden)
  }

  const installPWA = (isiOS: boolean) => {
    if (isiOS) {
      setIsModalOpen(true)
    } else {
      promptToInstall()
    }
  }

  if (isModalOpen) {
    return <AppleInstallModal closeModal={() => setIsModalOpen(false)} />
  }

  return (
    <Banner $isHidden={isHidden}>
      <CrossButton onClick={closeBanner}>{CrossIcon}</CrossButton>
      <BannerText>
        {isMobileDevice
          ? "Experience Reactive Analytics as an app"
          : "Experience Reactive Analytics on your desktop"}
      </BannerText>
      <InstallButton onClick={() => installPWA(isiOS)}>Install</InstallButton>
    </Banner>
  )
}
