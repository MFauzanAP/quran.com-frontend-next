import { useEffect, useState } from 'react';

import useTranslation from 'next-translate/useTranslation';

import styles from './Toolbar.module.scss';

import Button, { ButtonType } from '@/dls/Button/Button';
import Checkbox from '@/dls/Forms/Checkbox/Checkbox';
import { toLocalizedNumber } from '@/utils/locale';

const TOTAL_NUMBER_OF_SURAHS = 114;

type ToolbarProps = {
  numSelected: number;
  handleSaveOnClick: () => void;
  handleLoadOnClick: () => void;
  handleResetOnClick: () => void;
  handleSelectOnChange: (checked: boolean) => void;
};

const Toolbar = ({
  numSelected,
  handleSaveOnClick,
  handleLoadOnClick,
  handleResetOnClick,
  handleSelectOnChange,
}: ToolbarProps) => {
  const { t, lang } = useTranslation('random');
  const [isChecked, setIsChecked] = useState<boolean | 'indeterminate'>(false);

  useEffect(() => {
    if (!numSelected) setIsChecked(false);
    else if (numSelected === TOTAL_NUMBER_OF_SURAHS) setIsChecked(true);
    else setIsChecked('indeterminate');
  }, [numSelected]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Checkbox
          id="selectAll"
          checked={isChecked}
          label={`${toLocalizedNumber(numSelected, lang)} ${t('selected')}`}
          onChange={handleSelectOnChange}
        />
      </div>
      <div className={styles.right}>
        <Button type={ButtonType.Secondary} onClick={handleResetOnClick}>
          {t('reset-changes')}
        </Button>
        <Button type={ButtonType.Secondary} onClick={handleLoadOnClick}>
          {t('load-previous')}
        </Button>
        <Button type={ButtonType.Primary} onClick={handleSaveOnClick}>
          {t('save-randomize')}
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
