import Board from '../../../components/Board';
import {readStore} from '../../../lib/server/store';
export default async function Page(){return <Board initial={(await readStore()).board}/>}
