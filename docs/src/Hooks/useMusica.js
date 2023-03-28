import { useEffect } from "react";
import audioFile from '../../Musica/Navidad.mp3'


export function useMusica(estado){

  useEffect(() => {
    const audio = new Audio(audioFile);
    audio.volume = 0.05;
    audio.loop = true;
    if(estado){
      audio.play();
    }else{
      audio.pause();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [estado])
}