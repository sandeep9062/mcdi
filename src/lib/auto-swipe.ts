import { type EmblaCarouselType } from 'embla-carousel'

export type AutoSwipeOptions = {
  delay: number
  stopOnInteraction: boolean
  stopOnMouseEnter: boolean
}

export function autoSwipe(
  options: AutoSwipeOptions = { delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }
) {
  return function (emblaApi: EmblaCarouselType) {
    const { delay, stopOnInteraction, stopOnMouseEnter } = options
    let intervalId: number | undefined
    let isPlaying = true

    const play = () => {
      if (!isPlaying) return
      clearInterval(intervalId)
      intervalId = window.setInterval(() => {
        if (isPlaying) emblaApi.scrollNext()
      }, delay)
    }

    const stop = () => {
      isPlaying = false
      clearInterval(intervalId)
    }

    const reset = () => {
      isPlaying = true
      play()
    }

    const onInteraction = () => {
      if (!stopOnInteraction) return
      stop()
    }

    const onMouseEnter = () => {
      if (!stopOnMouseEnter) return
      stop()
    }

    const onMouseLeave = () => {
      if (!stopOnMouseEnter) return
      reset()
    }

    emblaApi.on('init', play)
    emblaApi.on('reInit', play)
    emblaApi.on('destroy', stop)

    if (stopOnInteraction) {
      emblaApi.on('pointerDown', onInteraction)
      emblaApi.on('select', play)
    }

    if (stopOnMouseEnter) {
      const container = emblaApi.containerNode()
      container.addEventListener('mouseenter', onMouseEnter)
      container.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      stop()
      if (stopOnMouseEnter) {
        const container = emblaApi.containerNode()
        container.removeEventListener('mouseenter', onMouseEnter)
        container.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }
}
