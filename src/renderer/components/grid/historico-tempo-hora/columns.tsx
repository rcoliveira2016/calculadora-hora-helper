import { HistoricoTempoHoraHelper } from '@/helpers/components/historico-tempo-hora/grid/HistoricoTempoHoraHelper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Zoom } from '@mui/material';
import {
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
} from '@mui/x-data-grid';
import { HistoricoTempoHoraProps, RowHistoricoTempoHora } from './type';

function TableSpanCopy(props: { texto: string }) {
  const onDoubleClick = () => {
    navigator.clipboard.writeText(props.texto);
  };
  return (
    <span
      style={{
        userSelect: 'none',
      }}
      onDoubleClick={onDoubleClick}
    >
      <Tooltip TransitionComponent={Zoom} title="click duas vezes para copiar">
        <span>{props.texto}</span>
      </Tooltip>
    </span>
  );
}
function renderSpanTableCellCopy(params: GridRenderCellParams<string>) {
  return <TableSpanCopy texto={params?.value ?? ''} />;
}

export function ObterColunas(props: HistoricoTempoHoraProps) {
  const handleDeleteClick = (row: GridRowModel) => () => {
    // event.stopPropagation();
    const item = row as RowHistoricoTempoHora;
    props.onRemove(item);
  };
  const columns: GridColumns = [
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (p) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(p.row)}
          color="inherit"
        />,
      ],
    },
    {
      field: 'inicio',
      headerName: 'Inicio',
      renderCell: renderSpanTableCellCopy,
      editable: true,
      preProcessEditCellProps: (params) => {
        return {
          ...params.props,
          error: !HistoricoTempoHoraHelper.validarTextoForamatoHoraMinuto(
            params.props.value as string
          ),
        };
      },
    },
    {
      field: 'tipoAcao',
      headerName: 'Ação',
    },
    {
      field: 'final',
      headerName: 'Final',
      renderCell: renderSpanTableCellCopy,
      editable: true,
      preProcessEditCellProps: (params) => {
        return {
          ...params.props,
          error: !HistoricoTempoHoraHelper.validarTextoForamatoHoraMinuto(
            params.props.value as string
          ),
        };
      },
    },
    {
      field: 'total',
      headerName: 'Total',
    },
    {
      field: 'fJira',
      headerName: 'f. jira',
      renderCell: renderSpanTableCellCopy,
    },
    {
      field: 'fDecimal',
      headerName: 'f. decimal',
      renderCell: renderSpanTableCellCopy,
    },
    {
      field: 'dataInclusao',
      headerName: 'Inclusão',
      type: 'dateTime',
      minWidth: 150,
    },
    {
      field: 'subtrair',
      headerName: 'subtrair',
      editable: true,
      preProcessEditCellProps: (params) => {
        return {
          ...params.props,
          error: !HistoricoTempoHoraHelper.validarTextoForamatoHoraMinuto(
            params.props.value as string
          ),
        };
      },
    },
    {
      field: 'tag',
      headerName: 'Tag',
      editable: true,
      renderCell: renderSpanTableCellCopy,
    },
  ];
  return columns;
}
