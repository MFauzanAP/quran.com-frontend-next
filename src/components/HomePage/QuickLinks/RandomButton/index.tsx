/* eslint-disable react-func/max-lines-per-function */
import React, { useCallback, useContext, useMemo } from 'react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import styles from './RandomButton.module.scss';

import DataContext from '@/contexts/DataContext';
import Button, { ButtonShape, ButtonSize } from '@/dls/Button/Button';
import PopoverMenu from '@/dls/PopoverMenu/PopoverMenu';
import CaretDownIcon from '@/icons/caret-down.svg';
import RepeatIcon from '@/icons/repeat.svg';
import { getRandomAll } from '@/utils/random';

const MENU_OPTIONS = [
  {
    key: '5',
    text: 'Any surah',
    slug: '/5',
  },
];

const RandomButton: React.FC = () => {
  const { t } = useTranslation('quick-links');
  const router = useRouter();
  const chaptersData = useContext(DataContext);

  /**
   * This is the list of options shown in the popover menu to pick a random surah/ayah.
   *
   * We need to memoize this list so that it is not re-generated on every re-render.
   * We should only need it to generate the random keys once each time the popover opens.
   */
  const MENU_OPTIONS = useMemo(() => {
    const [randomSurahId, randomSurahAyahId, randomReadSurahId, randomReadSurahAyahId] =
      getRandomAll(chaptersData, t('verse').toLowerCase());

    return [
      {
        name: 'Any surah',
        key: randomSurahId,
        slug: randomSurahId,
      },
      {
        name: 'Any ayah',
        key: randomSurahAyahId,
        slug: randomSurahAyahId.replace(':', '?startingVerse='),
      },
      {
        name: 'Previously read surah',
        key: randomReadSurahId,
        slug: randomReadSurahId,
      },
      {
        name: 'Previously read ayah',
        key: randomReadSurahAyahId,
        slug: randomReadSurahAyahId.replace(':', '?startingVerse='),
      },
    ];
  }, []);

  const renderOptions = useCallback(
    () =>
      MENU_OPTIONS.map((option) => (
        <PopoverMenu.Item
          shouldCloseMenuAfterClick
          key={option.key}
          onClick={() => router.push(option.slug)}
        >
          {option.name}
        </PopoverMenu.Item>
      )),
    [MENU_OPTIONS, router],
  );

  return (
    <div className={styles.buttonContainer}>
      <Button prefix={<RepeatIcon />} size={ButtonSize.Small} className={styles.button}>
        {t('pick-random')}
      </Button>
      <PopoverMenu
        trigger={
          <Button shape={ButtonShape.Square} size={ButtonSize.Small} className={styles.button}>
            <CaretDownIcon />
          </Button>
        }
      >
        {renderOptions()}
      </PopoverMenu>
    </div>
  );
};

export default RandomButton;
