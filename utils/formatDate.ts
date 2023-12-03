import dayjs from 'dayjs';

const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("YYYY年MM月DD日");
};

export default formatDate