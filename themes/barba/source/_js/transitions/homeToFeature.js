/* eslint-disable no-mixed-operators */
import { gsap } from 'gsap'
import { getInstance } from '../app'
// DEV
// import { qs, qsa } from '../../../source/_js/utils/dom'
// import deferred from '../../../source/_js/utils/deferred'

export default {
  sync: true,
  from: {
    route: 'home',
  },
  to: {
    route: 'feature',
  },

  leave({ current, next }) {
    const intro = current.container.querySelector('.homepage')
    const oldLogo = current.container.querySelector('.logo.homepage__logo')
    const newLogo = next.container.querySelector('.logo.featured')
    const title = current.container.querySelectorAll('h1 span')
    const buttons = current.container.querySelectorAll('.homepage__buttons a')
    const list = current.container.querySelector('.homepage__list')
    const hoverIndex = next.container.querySelector('.feature').dataset
      .featureOrder
    const bigShape = current.container.querySelectorAll(
      '.logo.only-big .hover .item'
    )[hoverIndex]
    const oldBigShape = current.container.querySelector('.logo.only-big')
    const newBigShape = next.container.querySelector('.logo.only-big')

    // newBigShape.classList.remove('can-move')
    current.container.style.zIndex = -1
    oldLogo.querySelector('svg').classList.add('fillgray')

    const oldLogoRect = oldLogo.getBoundingClientRect()
    const newLogoRect = newLogo.getBoundingClientRect()
    const oldBigShapeRect = oldBigShape.getBoundingClientRect()
    const newBigShapeRect = newBigShape.getBoundingClientRect()
    const scale = newLogoRect.width / oldLogoRect.width

    console.log('old', oldBigShapeRect)
    console.log('new', newBigShapeRect)

    current.container.querySelector('.menu-trigger').style.opacity = '0'
    intro.classList.add('to-feature')

    gsap.killTweensOf(bigShape)

    const logoY =
      oldLogoRect.y +
      oldLogoRect.height / 2 -
      (newLogoRect.y + newLogoRect.height / 2)

    return gsap
      .timeline({
        onComplete: () => {
          // newBigShape.classList.add('can-move')
        },
      })
      .to(
        oldLogo,
        {
          duration: 1.4,
          scale,
          y: -logoY,
          ease: 'power4.inOut',
        },
        0
      )
      .to(
        bigShape,
        {
          duration: 0.1,
          opacity: 1,
        },
        0
      )
      .to(
        oldBigShape,
        {
          duration: 1.3,
          y: newBigShapeRect.top + oldBigShapeRect.height,
          ease: 'power4.inOut',
        },
        0.1
      )
      .to(
        oldBigShape,
        {
          duration: 0.2,
          opacity: 0,
        },
        1.4
      )
      .from(
        newBigShape,
        {
          duration: 0.01,
          opacity: 0,
        },
        1.4
      )
      .add(() => {
        bigShape.classList.add('grow')
      }, 0)
      .to(
        list,
        {
          duration: 0.8,
          opacity: 0,
          ease: 'power4.in',
        },
        0
      )
      .to(
        title,
        {
          duration: 1,
          yPercent: 100,
          ease: 'power4.in',
          stagger: 0.05,
        },
        0
      )
      .to(
        buttons,
        {
          duration: 1,
          y: 40,
          opacity: 0,
          ease: 'power4.in',
          stagger: 0.05,
        },
        0.1
      )
  },
  enter({ next }) {
    const { container } = next
    const newLogo = container.querySelector('.logo.featured')
    const featureContainer = container.querySelector('.feature-content')
    const featureBox = container.querySelector('.feature-box')
    const navigation = container.querySelectorAll('.feature__nav__el')

    const tl = gsap.timeline({
      delay: 1.3,
      onComplete: () => {
        getInstance(next.container, 'feature').animateIn()
      },
    })

    tl.from(
      newLogo,
      {
        duration: 1,
        opacity: 0,
      },
      0
    )
    featureBox &&
      tl.from(
        featureBox,
        {
          duration: 1.5,
          y: 100,
          opacity: 0,
          ease: 'power4',
        },
        0
      )
    tl.from(
      featureContainer,
      {
        duration: 1,
        opacity: 0,
        y: 200,
        ease: 'power4',
        rotationX: '20deg',
      },
      0
    ).from(
      navigation,
      {
        duration: 0.4,
        opacity: 0,
        y: 30,
        ease: 'power4',
        stagger: 0.2,
      },
      0.8
    )

    return tl
  },
}
