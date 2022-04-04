import React from 'react';
import ReactModal from 'react-modal';
import {buildFlagImageUrl} from '../utils/flag-utils';
import './UniversityDetailsModal.scss';
import {CloseIcon} from './CloseIcon';

export const UniversityDetailsModal = ({ university, onClose }) => {
  const universityName = university?.['Educational institution'];
  const countryCode = university?.['Country code'];
  const degrees = university?.['Degrees'];
  const statement = university?.['Public Statement of Support'];
  const link = university?.['Step by step instructions for Ukrainian students'];

  return (
    <ReactModal
      isOpen={!!university}
      onRequestClose={onClose}
      preventScroll={true}
      className="modal"
      style={{overlay: {display: 'flex', justifyContent: 'center', zIndex: 20}}}
    >
      <button onClick={onClose} className="modal-close-button">
        <CloseIcon/>
      </button>

      <div className="modal-header">
        <div className="modal-title">
          <div className="modal-title-text">{universityName}</div>
          <div className="flag mini"
               style={{backgroundImage: buildFlagImageUrl(countryCode)}}/>
        </div>
      </div>

      <div className="modal-content">
        <p className="modal-degree"><b>Degrees: </b>{degrees}</p>

        {Boolean(statement) && <p><b>Statement: </b>{statement}</p>}

          {
            link ? (
              <p>
                <a href={link} target="_blank" rel="noreferrer">Link To Instructions</a>
              </p>
            ) : ''
          }
        </div>
    </ReactModal>
  );
}
