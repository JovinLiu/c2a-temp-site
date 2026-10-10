import Publisher from '../../../components/Publisher';
import {readStore} from '../../../lib/server/store';
export default async function Page(){return <Publisher initial={(await readStore()).stories}/>}
