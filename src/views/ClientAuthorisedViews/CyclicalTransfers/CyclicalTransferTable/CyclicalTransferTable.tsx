import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BootstrapTable from 'react-bootstrap-table-next';
import { CyclicalTransferModel } from '../../../../interfaces/DatabaseModels/CyclicalTransferModel';
import { useModalState } from '../../../../hooks/useModalState';
import EditCyclicalTransferModal from './EditCyclicalTransferModal/EditCyclicalTransferModal';
import ConfirmationModal from '../../../../components/Modal/ConfirmationModal/ConfirmationModal';
import { CyclicalTransferDisplayModel } from '../../../../interfaces/CyclicalTransferDisplayModel';
import { useColumns } from './hooks/useColumns';
import { useTableProps } from '../../../../hooks/useTableProps';
import { useCyclicalTransfers } from '../../../../contexts/CyclicalTransferContext';

const CyclicalTransferTable = () => {
  const {
    toggleVisibility: toggleEditModalVisibility,
    showModal: showEditModal,
    entity: selectedCyclicalTransferToEdit,
  } = useModalState<CyclicalTransferModel>();

  const {
    toggleVisibility: toggleDeleteModalVisibility,
    showModal: showDeleteModal,
    entity: selectedCyclicalTransferToDelete,
  } = useModalState<CyclicalTransferModel>();

  const { cyclicalTransfers, estimatedData } = useCyclicalTransfers();

  const { fetchData: fetchEstimatedData } = estimatedData;

  const {
    data: cyclicalTransferData,
    fetchData: fetchCyclicalTransfers,
    isPending: areCyclicalTransfersPending,
  } = cyclicalTransfers;

  const tableProps = useTableProps<CyclicalTransferDisplayModel>(
    {
      data: cyclicalTransferData,
      isPending: areCyclicalTransfersPending,
    },
    'transferId',
  );

  const columns = useColumns({
    toggleDeleteModalVisibility,
    toggleEditModalVisibility,
  });

  const [isRequestPending, setIsRequestPending] = useState(false);

  const handleDeleteCyclicalTransfer = useCallback(async() => {
    if (!selectedCyclicalTransferToDelete) return;

    setIsRequestPending(true);

    const currentCyclicalTransferId = selectedCyclicalTransferToDelete.transferId;

    try {
      await axios.delete(`/cyclical-transfers/${currentCyclicalTransferId}`);

      await fetchCyclicalTransfers();
      await fetchEstimatedData();
      toast.success('Przelew cykliczny został usunięty pomyślnie.');
    } catch {
      toast.error('Usunięcie przelewu cyklicznego nie powiodło się');
    } finally {
      setIsRequestPending(false);
      toggleDeleteModalVisibility();
    }
  }, [selectedCyclicalTransferToDelete, fetchEstimatedData, fetchCyclicalTransfers, toggleDeleteModalVisibility]);

  return (
    <>
      <BootstrapTable
        {...tableProps}
        columns={columns}
      />

      <ConfirmationModal
        showModal={showDeleteModal}
        toggleVisibility={toggleDeleteModalVisibility}
        isRequestPending={isRequestPending}
        onConfirm={handleDeleteCyclicalTransfer}
        header={`Usunięcie przelewu cyklicznego: ${selectedCyclicalTransferToDelete?.title}`}
      >
        <h5 className="text-center">Czy na pewno chcesz usunąć ten przelew cykliczny?</h5>
      </ConfirmationModal>

      <EditCyclicalTransferModal
        showModal={showEditModal}
        toggleVisibility={toggleEditModalVisibility}
        selectedCyclicalTransfer={selectedCyclicalTransferToEdit || {} as CyclicalTransferModel}
      />
    </>
  );
};

export default CyclicalTransferTable;
