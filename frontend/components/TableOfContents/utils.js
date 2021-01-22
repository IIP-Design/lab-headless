import style from './TableOfContents.module.scss';

export const getButtonStyle = ( icon, focus ) => {
  const base = icon ? style['with-icon'] : style['without-icon'];

  return focus ? `${base} ${style.selected}` : base;
};
