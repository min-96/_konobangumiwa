import { Review, ReviewUser } from "../types/movie";

export const oneMovie =
    {
      id: '1',
      thumbnail: 'https://an2-img.amz.wtchn.net/image/v2/14PuoHZ3-X5F3BuR1NkGtg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56YzFOamN5TmpZek56SXdNVFUwTURRaWZRLlBma1RwbHY3eUVSMGRhMUJPVnBEMktIVnVVa3ZxYjFhUllBNzJCTkQ5Unc',
      title: '영화 제목 1',
      rating: 4.5,
    };
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


export const reviews : ReviewUser[] = [
  {
    id: 1,
    userId: 5,
    evaluation: 4.5,
    comment: '정말 좋아요!',
    animationId: 1,
    user: {
      id: 5,
      googleId: 'test',
      email: 'test',
      displayName: '철수',
      pictureUrl: 'https://thumbs.dreamstime.com/b/brown-dog-corso-corso-stands-field-green-grass-brown-dog-corso-cors-120197441.jpg',
      introduction: ''
    }
  },

  {
    id: 1,
    userId: 6,
    evaluation: 4,
    comment: '철수랑 봤는데 재밌어요',
    animationId: 1,
    user: {
      id: 6,
      googleId: 'test',
      email: 'test',
      displayName: '영희',
      pictureUrl: null,
      introduction: ''
    }
  }, 

  {
    id: 1,
    userId: 7,
    evaluation: 1,
    comment: '멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍멍',
    animationId: 1,
    user: {
      id: 7,
      googleId: 'test',
      email: 'test',
      displayName: '흰둥이',
      pictureUrl: null,
      introduction: ''
    }
  }, 

  {
    id: 1,
    userId: 8,
    evaluation: 5,
    comment: '철수와 영희가 손잡고봤... 더보기',
    animationId: 1,
    user: {
      id: 8,
      googleId: 'test',
      email: 'test',
      displayName: '훈이',
      pictureUrl: null,
      introduction: ''
    }
  }, 

  {
    id: 1,
    userId: 9,
    evaluation: 4,
    comment: '',
    animationId: 1,
    user: {
      id: 9,
      googleId: 'test',
      email: 'test',
      displayName: '영철',
      pictureUrl: null,
      introduction: null
    }
  }, 

  {
    id: 1,
    userId: 10,
    evaluation: 4,
    comment: '흠',
    animationId: 1,
    user: {
      id: 10,
      googleId: 'test',
      email: 'test',
      displayName: '빡구',
      pictureUrl: null,
      introduction: ''
    }
  }, 

];

export const oneReview : Review = reviews[0];