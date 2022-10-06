export const S = (...Styles) => {
  return Object.values(Styles).filter(Boolean).join(' ').trim()
}

export const msToTime = (duration, format = 'HH:MM:SS:MS') => {
  let FormatedTime = format.replace('HH', '00').replace('MM', '00').replace('SS', '00').replace('MS', '00')

  if (duration > 0) {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    FormatedTime = format.replace('HH', hours).replace('MM', minutes).replace('SS', seconds).replace('MS', milliseconds)
  }
  return FormatedTime
}

export const CopyClipBoard = (text) => {
  navigator.clipboard.writeText(text)
}
