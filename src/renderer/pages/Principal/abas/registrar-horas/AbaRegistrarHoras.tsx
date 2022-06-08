import AbaRegistrarHorasAdicionarHoras from './AbaRegistrarHorasAdicionarHoras';
import { AbaRegistrarHorasToolbar } from './AbaRegistrarHorasToolbar';
import { AbaRegistrarHorasGridContainer } from './AbaRegistrarHorasGridContainer';

export default function AbaRegistrarHoras() {
  return (
    <div style={{ marginTop: '-18px' }}>
      <AbaRegistrarHorasToolbar />
      <AbaRegistrarHorasAdicionarHoras />
      <AbaRegistrarHorasGridContainer />
    </div>
  );
}
