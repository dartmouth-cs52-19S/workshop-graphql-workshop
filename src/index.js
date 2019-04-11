import $ from 'jquery';
import './style.scss';

console.log('starting up!');
let num = 0;

setInterval(() => { $('#main').html(`You've been on this page for ${num += 1} seconds.`); }, 1000);
