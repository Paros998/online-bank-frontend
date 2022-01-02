import { useCurrentUser } from '../../../../contexts/CurrentUserContext';
import { ClientModel } from '../../../../interfaces/DatabaseModels/ClientModel';
import { useFetchRawData } from '../../../../hooks/useFetchRawData';
import { useMemo } from 'react';
import { getFormattedTransferDate } from '../../History/utils/getFormattedTransferDate';
import { CyclicalTransferSearchFormikValues } from '../../../../interfaces/formik/CyclicalTransferSearchFormikValues';
import moment from 'moment';
import { CyclicalTransferModel } from '../../../../interfaces/DatabaseModels/CyclicalTransferModel';

export const useCyclicalTransfers = (params?: CyclicalTransferSearchFormikValues) => {
  const { currentUser } = useCurrentUser<ClientModel>();
  const {
    rawData: cyclicalTransfers,
    isPending,
    fetchData
  } = useFetchRawData<CyclicalTransferModel[]>(`/cyclical-transfers/client/${currentUser?.clientId}`, params);

  const formattedCyclicalTransfers = useMemo(() =>
    cyclicalTransfers?.map(({ amount, reTransferDate, ...cyclicalTransfer }) =>
      (
        {
          ...cyclicalTransfer,
          amount: `${(amount as number * -1).toFixed(2)} PLN`,
          reTransferDate: moment(reTransferDate).format('DD.MM'),
        }
      )
    ), [cyclicalTransfers, getFormattedTransferDate]) as CyclicalTransferModel[];

  return { formattedCyclicalTransfers, isPending, fetchCyclicalTransfers: fetchData };
};
