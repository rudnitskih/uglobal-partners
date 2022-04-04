import React from 'react';
import s from './Header.module.scss';
import logo from './logo.webp'

export function Header() {
  return (
    <div className={s.root}>
      <img src={logo} alt="logo" className={s.logo}/>

      <div className={s.menuContainer}>
        <ul className={s.menu}>
          {
            [
              {title: 'For Educational Institutions', url: 'for_educational_institutions'},
              {title: 'For Volunteering Members', url: 'for_volunteers'},
              {title: 'For Ukrainian Students and Academics', url: 'for_students'},
            ].map(({title, url}) => {
              return (
                <li key={url}>
                  <a href={`/${url}/`} className={s.link}>{title}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
