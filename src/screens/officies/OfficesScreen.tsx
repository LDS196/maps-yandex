import Menu from './components/menu/Menu.tsx';
import s from './OfficesScreen.module.scss';
import { useState } from 'react';
import { YMap } from './components/ymap/YMap.tsx';

export const OfficesScreen = () => {
  const [selectedCountryId, setSelectedCountryId] = useState(1);
  const [selectedOfficeId, setSelectedOfficeId] = useState<null | number>(null);

  const handleSelectСountry = (id: number) => {
    setSelectedCountryId(id);
    setSelectedOfficeId(null);
  };
  const handleSelectOffice = (id: number | null) => {
    setSelectedOfficeId(id);
  };
  return (
    <div className={s.container}>
      <Menu
        selectCountry={handleSelectСountry}
        selectOffice={handleSelectOffice}
        selectedСountryId={selectedCountryId}
      />
      <YMap selectedCountryId={selectedCountryId} selectedOfficeId={selectedOfficeId} />
    </div>
  );
};
