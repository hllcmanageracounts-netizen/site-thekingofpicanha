'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'pt'

export const dict = {
  en: {
    navStory: 'Our story',
    navMenu: 'The menu',
    navFind: 'Find us',
    heroKicker: 'Brazilian steakhouse · Philadelphia',
    heroTitle1: 'The art of',
    heroTitle2: 'the perfect',
    heroTitle3: 'cut.',
    heroDesc: 'Authentic Brazilian barbecue, generous cuts and the warmth of a table made for gathering.',
    discoverStory: 'Discover our story',
    storyKicker: 'A Brazilian tradition',
    storyTitle1: 'Born from fire.',
    storyTitle2: 'Made to share.',
    storyDesc: 'At The King of Picanha, every cut tells a story. We bring the spirit of Brazil to Philadelphia through fire, flavor and a table full of people you love.',
    flameText: 'Open flame, patient hands and the bold flavor of our steakhouse grill.',
    utensilsText: 'Premium cuts and authentic Brazilian dishes, prepared generously for every table.',
    experienceKicker: 'The experience',
    experienceTitle1: 'Come hungry.',
    experienceTitle2: 'Leave happy.',
    experienceDesc: 'Picanha, grilled specialties and Brazilian classics. Lunch, dinner or brunch — there is always room at our table.',
    exploreMenu: 'Explore the menu',
    orderKicker: 'Online order',
    orderTitle: 'Craving picanha now?',
    orderBtn: 'Order online',
    visitKicker: 'Visit the King',
    visitTitle1: 'Come experience',
    visitTitle2: 'the King.',
    visitDesc: 'The table is set in Philadelphia. Bring your appetite — we will take care of the fire.',
    findUs: 'Find us',
    callUs: 'Call us',
    getDirections: 'Get directions',
    callNow: 'Call now',
    todaysHours: "Today's hours",
    closedToday: 'Closed today',
    openNow: 'Open now',
    closedNow: 'Closed now',
    seeAllHours: 'See all hours',
    backToTop: 'Back to top ↑',
  },
  pt: {
    navStory: 'Nossa história',
    navMenu: 'O cardápio',
    navFind: 'Onde estamos',
    heroKicker: 'Steakhouse brasileira · Philadelphia',
    heroTitle1: 'A arte do',
    heroTitle2: 'corte',
    heroTitle3: 'perfeito.',
    heroDesc: 'Cortes brasileiros premium preparados na brasa, com o calor de uma mesa feita para reunir pessoas.',
    discoverStory: 'Conheça nossa história',
    storyKicker: 'Uma tradição brasileira',
    storyTitle1: 'Nascido do fogo.',
    storyTitle2: 'Feito para reunir.',
    storyDesc: 'No The King of Picanha, cada corte conta uma história. Trazemos o espírito do Brasil para Philadelphia através do fogo, do sabor e de uma mesa cheia de gente que você ama.',
    flameText: 'Fogo aberto, mãos experientes e o sabor marcante da nossa steakhouse.',
    utensilsText: 'Cortes premium e pratos brasileiros autênticos, preparados com generosidade para cada mesa.',
    experienceKicker: 'A experiência',
    experienceTitle1: 'Venha com fome.',
    experienceTitle2: 'Saia feliz.',
    experienceDesc: 'Picanha, especialidades grelhadas e clássicos brasileiros. Almoço, jantar ou brunch — sempre há lugar à nossa mesa.',
    exploreMenu: 'Ver o cardápio',
    orderKicker: 'Peça online',
    orderTitle: 'Com vontade de picanha agora?',
    orderBtn: 'Peça online',
    visitKicker: 'Visite o Rei',
    visitTitle1: 'Venha conhecer',
    visitTitle2: 'o Rei.',
    visitDesc: 'A mesa está posta em Philadelphia. Traga seu apetite — do fogo cuidamos nós.',
    findUs: 'Onde estamos',
    callUs: 'Ligue para nós',
    getDirections: 'Como chegar',
    callNow: 'Ligar agora',
    todaysHours: 'Horário de hoje',
    closedToday: 'Fechado hoje',
    openNow: 'Aberto agora',
    closedNow: 'Fechado agora',
    seeAllHours: 'Ver todos os horários',
    backToTop: 'Voltar ao topo ↑',
  },
} as const

export type Dict = typeof dict.en

const LanguageContext = createContext<{ lang: Lang; toggleLang: () => void; t: Dict } | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem('lang')
    if (saved === 'en' || saved === 'pt') setLang(saved)
  }, [])

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'pt' : 'en'
    setLang(next)
    window.localStorage.setItem('lang', next)
  }

  return <LanguageContext.Provider value={{ lang, toggleLang, t: dict[lang] }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
