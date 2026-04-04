import { PhETSim } from './PhETSim';
import './PhETSim.css';

interface Props {
  config: { url: string; title: string; aspectRatio?: number };
}

export default function PhETSimWrapper({ config }: Props) {
  return <PhETSim url={config.url} title={config.title} aspectRatio={config.aspectRatio} />;
}
