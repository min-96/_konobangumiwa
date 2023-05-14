import { Review } from "../types/movie";

export const movies = [
  {
    id: '1',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/14PuoHZ3-X5F3BuR1NkGtg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzFOamN5TmpZek56SXdNVFUwTURRaWZRLlBma1RwbHY3eUVSMGRhMUJPVnBEMktIVnVVa3ZxYjFhUllBNzJCTkQ5Unc',
    title: '영화 제목 1',
    rating: 4.5,
  },
  {
    id: '2',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/p08ht7J3IwJCCljaQa2oPA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9ESTBNRGswTURrNE1ERTNNVFF5TmpraWZRLi1KamhSZDdvOTBoaGJYcy1YNXh1UDlyS1E0RE1oXzdlV0ZrYS1NRkNQcVk',
    title: '영화 제목 2',
    rating: 3.8,
  },

  {
    id: '3',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/YV2rxuLR8fqQ2B9LvtJDog.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9ETXdPRGN4T0RVNU16ZzROREUzT1RraWZRLjNRWkFrTG9WdDk3YW1kTXpPRUdCd3lzS2Nxb2kxUk1GUEdDaDBQUkNhYU0',
    title: '영화 제목 3',
    rating: 3.8,
  },

  {
    id: '4',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/o18xWgRx8osRs4d8E69KLg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9ERXhOalE1TVRRMU5ETXlNRGM0TVRjaWZRLjc4RVI4UEtoWHZyMzljOUt6akVIZFplR1lpN3RKQUFlNy1fSWRlN3pCRG8',
    title: '영화 제목 4',
    rating: 3.8,
  },

  {
    id: '5',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/KdZZFDjbAnzNfrYsEH6csQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56RTNOalk0TlRjMU1EVTFNamMzTWpVaWZRLkFjc1FZVGZkSHdueEVBX2dpQ20xcnQ3WUhuTDdfLTllQzlYa0l3NWVvVUk',
    title: '영화 제목 5',
    rating: 3.8,
  },
  {
    id: '6',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/jxphd8F4SZW1tAbUrN-aug.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56a3lOelUyTkRFMk9Ua3dNVFV6TURZaWZRLmhnMWJMbUl6Wmx5Q21ycm81RTBwRlV6UTM5N2k0ZnJWa1pUT1dDcTE0OFE',
    title: '영화 제목 6',
    rating: 3.8,
  },
  {
    id: '7',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/PT9EiX7XKBSFszbLwB0lJg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9EQTNPVFl6TXprNU5qYzBNamc1TURBaWZRLm9veWJ4NlpQVWFiaC1OX0R1OENuWjZpdGxjMm0tcVR2Y2ZzaFZsMXF4ZzQ',
    title: '영화 제목 7',
    rating: 3.8,
  },
  {
    id: '8',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/T7qP_idp-A7AdHCV6-wZBA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56VTJOVE16TlRNNE9EVTVNVEEyTURVaWZRLmZxSThtNU1jQl9HSDFxQ0plZGlUYUxPa1R4WTVwSC1kZGhNWVhISy16anM',
    title: '영화 제목 8',
    rating: 3.8,
  },
  {
    id: '9',
    thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/93ikI9PjazpuYaM1HUjj5Q.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk16a3pNakF6TnpVeU1URXpPRFUzTVRZaWZRLmY4OUM3dnc4Q09UNElFMllYN00yU2UyaVhNQnYxbzRmWmxOeXdpbmR0WnM',
    title: '영화 제목 9',
    rating: 3.8,
  }
]

export const reviews : Review[] = [
  {
    id: 1,
    profileURL: 'https://thumbs.dreamstime.com/b/brown-dog-corso-corso-stands-field-green-grass-brown-dog-corso-cors-120197441.jpg',
    nickname: '철수',
    rating: 4.5,
    content: '정말 좋아요!',
  },
  {
    id: 2,
    nickname: '영희',
    rating: 5.0,
    content: '철수랑 봤는데 재밌어요',
  },
  {
    id: 3,
    nickname: '바둑이',
    rating: 4.0,
    content: '정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요',
  },
  {
    id: 4,
    nickname: '짱구',
    rating: 4.0,
    content: '정말재밋',
  },
  {
    id: 5,
    profileURL: 'https://thumbs.dreamstime.com/b/brown-dog-corso-corso-stands-field-green-grass-brown-dog-corso-cors-120197441.jpg',
    nickname: '흰둥이',
    rating: 4.0,
    content: '정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요',
  },
  {
    id: 6,
    nickname: '영수',
    rating: 4.0,
    content: '나도재밋다',
  },
  {
    id: 7,
    nickname: '흰둥이부계정',
    rating: 5.0,
    content: '정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요정말재밋고정말재밋고정말재밋어요',
  },
];