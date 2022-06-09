/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import '@/components/campos/seletor-hora/estilo.css';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { HistoricoTempoHoraHelper } from '@/helpers/components/historico-tempo-hora/grid/HistoricoTempoHoraHelper';
import {
  HistoricoTempoHoraProps,
  ItemHistoricoTempoHora,
  RowHistoricoTempoHora,
} from './type';
import { ObterColunas } from './columns';
import { TemaGridSubtraido } from './style';
import { useCellEditCommit } from './hooks';

function craeteRow(item: ItemHistoricoTempoHora): RowHistoricoTempoHora {
  return HistoricoTempoHoraHelper.craeteRow(item);
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport
        csvOptions={{
          fileName: 'data',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

export default function HistoricoTempoHora(props: HistoricoTempoHoraProps) {
  const { valor: listaHitorico } = props;

  function getRows(): RowHistoricoTempoHora[] {
    return listaHitorico.map(craeteRow);
  }

  function CreateDataTables() {
    const rows = getRows();
    const columns = ObterColunas(props);

    const handleCellEditCommit = useCellEditCommit(props);

    return (
      <Box sx={TemaGridSubtraido} style={{ height: 400, width: 800 }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                dataInclusao: false,
                tipoAcao: false,
                subtrair: false,
              },
            },
          }}
          getRowClassName={(params) =>
            params.row.subtrair ? `super-app-theme--subtraido` : ''
          }
          onCellEditCommit={handleCellEditCommit}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    );
  }
  return <div className="HistoricoTempoHora">{CreateDataTables()}</div>;
}
