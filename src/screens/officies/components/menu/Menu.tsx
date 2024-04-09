import s from './Menu.module.scss';
import { City } from '../../../../modules/ymap/interfaces.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import '../../../../styles/variables.scss';
import { data } from '../../../../modules/ymap/data.ts';

type MenuProps = {
  selectCountry: (id: number) => void;
  selectOffice: (id: number | null) => void;
  selectedСountryId: number;
};
const Menu = (props: MenuProps) => {
  const { selectCountry, selectOffice, selectedСountryId } = props;

  const citiesByCountry = useMemo(
    () => data.cities.filter((city) => city.countryId === selectedСountryId),
    [selectedСountryId],
  );

  //Render

  const buttonCountries = data.countries.map((country) => {
    return (
      <button
        key={country.id}
        onClick={() => {
          selectOffice(null);
          selectCountry(country.id);
        }}
        className={`${s.button} ${selectedСountryId === country.id ? s.button_active : ''}`}
      >
        {country.name}
      </button>
    );
  });

  return (
    <div className={s.menu}>
      <div className={s.countries}>{buttonCountries}</div>
      <div className={s.city_list}>
        {citiesByCountry.map((city) => (
          <MenuItem key={city.id} city={city} selectOffice={selectOffice} />
        ))}
      </div>
    </div>
  );
};

export default Menu;

type MenuItemProps = {
  city: City;
  selectOffice: (id: number) => void;
};

const MenuItem = (props: MenuItemProps) => {
  const { city, selectOffice } = props;

  const [expanded, setExpanded] = useState(false);

  const officesByCity = useMemo(
    () => data.offices.filter((office) => office.cityId === city.id),
    [city],
  );

  // Handler
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={s.item}>
      <div className={s.title}>
        <span className={expanded ? s.activeTitle : ''}>{city.name}</span>
        <button onClick={handleToggleExpand}>
          {!expanded ? <ChevronDown /> : <ChevronUp color={'#F4A900'} />}
        </button>
      </div>
      {expanded && (
        <ul>
          {officesByCity.map((office) => (
            <li
              key={office.id}
              className={`${s.item} ${s.officeItem}`}
              onClick={() => selectOffice(office.id)}
            >
              <span className={s.officeName}>{office.name}</span>
              <span>{office.owner}</span>
              <span>
                {office.phone.map((el) => (
                  <span key={el}>/{el}/</span>
                ))}
              </span>
              <span className={s.officeEmail}>{office.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
