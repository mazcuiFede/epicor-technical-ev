import React from 'react';
import { Link } from 'react-router-dom';

import { useMst } from '../../stores/StoreProvider';
import { useBreadcrumbs } from './../hooks/useBreadcrumbs';
import styles from './breadcrumbs.scss';

const Breadcrumb = ({ name, to }) => (
  to
    ? <Link className="breadcrumb" to={to}>{name}</Link>
    : <div className="breadcrumb">{name}</div>
);

const Breadcrumbs = () => {
  const storeValues = useMst(store => ({
    getPerson: store.getPerson,
    getPlanet: store.getPlanet,
  }));

  const breadCrumbElements = useBreadcrumbs(storeValues);

  const crumbs = breadCrumbElements.flatMap(({ name, to }, index) => {
    const elements = [
      <Breadcrumb key={index} name={capitalizeFirstLetter(name)} to={to} />
    ];

    if (index < breadCrumbElements.length - 1) {
      elements.push(
        <div key={`sep-${to}`} className="separator">&#x3e;</div>
      );
    }

    return elements;
  });

  return (
    <div className="breadcrumbs">
      {crumbs}
    </div>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Breadcrumbs;
