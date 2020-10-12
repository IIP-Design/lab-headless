import style from './Intro.module.scss';

const Intro = () => (
  <section className={ `max-w-2xl mx-auto ${style.container}` }>
    <h1 className={ style.heading }>
      Hello
    </h1>
    <h2 className={ style.subheading }>
      We are the Digital Lab
    </h2>
  </section>
);

export default Intro;
