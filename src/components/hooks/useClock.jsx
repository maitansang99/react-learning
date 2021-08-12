import { useEffect, useState } from 'react';

Clock.propTypes = {

};

function formatDate(date) {

    const hours = `0${date.getHours()}`.slice(-2)
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const seconds = `0${date.getSeconds()}`.slice(-2)
    return `${hours}:${minutes}:${seconds}`
}

function Clock(props) {
    const [timeString, setTimeString] = useState('');
    const clockInterval = useEffect(() => {
        setInterval(() => {
            const now = new Date();
            //HH:mm:ss
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        }, 1000)

        return () => {
            console.log('Clock cleanup')
            clearInterval(clockInterval)
        }
    }, [])
    return {timeString}
}

export default Clock;