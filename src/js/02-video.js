import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

try {
    setPlayedTime();
} catch (e) { 
    console.log(e.name);
    console.log(e.message);
}

updateTime();

function setPlayedTime() { 
    const ourTime = localStorage.getItem("videoplayer-current-time");
    const parsedTime = JSON.parse(ourTime);

    if (parsedTime) {
        player.setCurrentTime(parsedTime);
    }
};

function saveCurrentTime() { 
    player.getCurrentTime().then((time) => { 
    localStorage.setItem("videoplayer-current-time" , time);
    });
};

function updateTime() { 
    player.on('timeupdate', throttle(saveCurrentTime, 1000));
}
