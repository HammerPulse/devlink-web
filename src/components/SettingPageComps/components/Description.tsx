import EditorCard from '@/materials/EditorCard';
import { settingConfig } from '../config';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/user';
import { updateUserInfo } from '@/api/user';

const DescriptionSettingCard = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState('');
  const [isExternallyDisabled, setIsExternallyDisabled] = useState(false);
  const config = settingConfig.description;

  const { getUser, setUser } = useUserStore();

  useEffect(() => {
    getUser().then((res) => {
      setInputValue(res.profile.description);
      setInitialValue(res.profile.description);
    });
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === initialValue) {
      setIsExternallyDisabled(true);
    } else {
      setIsExternallyDisabled(false);
    }
  };

  const handleSave = () => {
    setLoading(true);
    updateUserInfo({ description: inputValue })
      .then((res) => {
        setUser(res.data);
        setInitialValue(res.data.profile.description);
        setIsExternallyDisabled(true);
      })
      .catch((err) => err)
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <EditorCard
      title={config.title}
      type='input'
      tips={config.tips}
      placeholder='请输入你的描述'
      initialValue={initialValue}
      value={inputValue}
      onInputChange={handleInputChange}
      onSave={handleSave}
      loading={loading}
      isExternallyDisabled={isExternallyDisabled}
    />
  );
};
export default DescriptionSettingCard;
