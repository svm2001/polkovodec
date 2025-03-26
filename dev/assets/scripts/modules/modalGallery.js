import lightGallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'

export default function modalGallery() {
  const galleries = document.querySelectorAll('[data-modal-gallery="gallery"]')

  if (!galleries.length) return

  const allGalleries = []

  galleries.forEach(gallery => {
    const elems = gallery.querySelectorAll('[data-modal-gallery="el-gallery"]')

    const instance = lightGallery(gallery, {
      selector: elems,
      speed: 500,
      controls: true,
      download: false,
      getCaptionFromTitleOrAlt: false,
      hideScrollbar: true,
      plugins: [lgZoom],
      mobileSettings: {
        controls: false,
        showCloseIcon: true,
      },
    })

    allGalleries.push(instance)
  })

  return allGalleries
}
