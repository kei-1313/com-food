"use client"

import formatDate from "@/utils/formatDate";

const FormattedDate = ({ dateString }: {dateString: string}) => {
  return <time>{formatDate(dateString)}</time>;
};

export default FormattedDate;