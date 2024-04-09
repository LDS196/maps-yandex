import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { data } from '../../../../modules/ymap/data.ts';
import { useEffect, useState } from 'react';
import s from './YMap.module.scss';

type MapInstance = ymaps.Map | null;

type YMapProps = {
  selectedCountryId: number;
  selectedOfficeId: number | null;
};

export const YMap = ({ selectedOfficeId, selectedCountryId }: YMapProps) => {
  const [zoom, setZoom] = useState<number>(3);
  const [mapInstance, setMapInstance] = useState<MapInstance>(null); // Состояние для хранения инстанса карты

  const center = selectedOfficeId
    ? data.offices.filter((el) => el.id === selectedOfficeId)[0].coordinates
    : data.countries.filter((el) => el.id === selectedCountryId)[0].coordinates;

  useEffect(() => {
    if (selectedOfficeId) {
      setZoom(13);
    }
  }, [selectedOfficeId]);

  useEffect(() => {
    if (!selectedOfficeId && selectedCountryId) {
      setZoom(3);
      if (mapInstance) {
        mapInstance.setZoom(3);
        mapInstance.balloon.close();
      }
    }
  }, [selectedCountryId, mapInstance]);

  useEffect(() => {
    if (mapInstance && selectedOfficeId) {
      // Логика открытия баллуна, когда карта полностью загружена и selectedOfficeId доступен
      // вынес сюда потому как есть конфликт открытия баллуна когда метки объедены в кластер
      const office = data.offices.find((office) => office.id === selectedOfficeId);
      if (office) {
        mapInstance.balloon.open(office.coordinates, {
          content: `
                  <div class="${s.balloon}">
              <h3>${office.name}</h3>
               <p>Владелец: ${office.owner}</p>
              <p>Телефон:${office.phone[0]}</p>
              <p>Email: ${office.email}</p>
             
            </div>
          `,
        });
      }
    }
  }, [mapInstance, selectedOfficeId]);

  return (
    <YMaps>
      <Map
        className={s.map}
        state={{
          center: center,
          zoom: zoom,
        }}
        instanceRef={(ref) => {
          if (ref) setMapInstance(ref); // Установка инстанса карты
        }}
      >
        <Clusterer
          options={{
            clusterIcons: [
              {
                href: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMDdiZmYiLz48L3N2Zz4=`,
                size: [32, 32],
                offset: [-16, -16],
              },
            ],
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
          }}
        >
          {data.offices.map((office) => (
            <Placemark
              key={office.id}
              geometry={office.coordinates}
              properties={{
                hintContent: office.name,

                balloonContent: `
                  <div class="${s.balloon}">
                    <h3>${office.name}</h3>
                    <p>Телефон:${office.phone[0]}</p>
                    <p>Email: ${office.email}</p>
                    <p>Владелец: ${office.owner}</p>
                  </div>
                `,
              }}
              modules={['geoObject.addon.balloon']}
              options={{
                preset: 'islands#blackIcon',
                hideIconOnBalloonOpen: false,
                iconOffset: [0, 20],
              }}
            />
          ))}
        </Clusterer>
      </Map>
    </YMaps>
  );
};
