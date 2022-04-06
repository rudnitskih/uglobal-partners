import React from 'react';
import s from './Header.module.scss';
import logo from './logo.webp';

export function Header() {
  const hostname = new URL((window.location !== window.parent.location)
    ? document.referrer
    : document.location.href).hostname;

  return (
    <div className={s.root}>
      <img src={logo} alt="" className={s.logo}/>

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
                  <a href={`https://${hostname}/${url}/`} className={s.link} target="_top">{title}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
