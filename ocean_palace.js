const start_time = Date.now();
console.time('passed_time');

const main_svg = document.querySelector('#main_svg');
const speed_control = 1000000;

const aquarium_frame = `<defs>
  <radialGradient cy="0" id="gradient_background" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#333333"></stop>
    <stop offset="1" stop-color="#110022"></stop>
  </radialGradient>
</defs>
<circle cx="1024" cy="1024" fill="url(#gradient_background)" r="1024"/>`;
const jellyfish_tank = [
  {
    type: 'jellyfish_12-6',
    radius: 128,
    opacity: 0.3,
    gradient: {
      inner: '#999900',
      outer: '#339966'
    },
    rotate_speed: -0.0096,
    movement_seeds: [ 11, -119, -14, 21, -99, -97 ]
  },
  {
    type: 'jellyfish_12-4',
    radius: 64,
    opacity: 0.2,
    gradient: {
      inner: '#000000',
      outer: '#666666'
    },
    rotate_speed: -0.00875,
    movement_seeds: [ 61, 36, -15, 100, -86, -121 ]
  },
  {
    type: 'jellyfish_8-4',
    radius: 96,
    opacity: 0.4,
    gradient: {
      inner: '#990066',
      outer: '#330066'
    },
    rotate_speed: 0.002982,
    movement_seeds: [ 31, 26, -14, 41, -113, 92 ]
  }
];

requestAnimationFrame(main_function);

function main_function() {
  const now_time = start_time + performance.now();
  let new_frame = aquarium_frame;

  for(const jellyfish_index in jellyfish_tank) {
    let new_jellyfish = jellyfish_tank[jellyfish_index];

    new_jellyfish.central = {
      x: 1024 + (1024 - new_jellyfish.radius * 13 / 12) * new_jellyfish.movement_seeds.reduce((sum, seed, seed_index) => sum + Math.cos(now_time * seed / speed_control) / 2 ** (seed_index + 1), 0),
      y: 1024 + (1024 - new_jellyfish.radius * 13 / 12) * new_jellyfish.movement_seeds.reduce((sum, seed, seed_index) => sum + Math.sin(now_time * seed / speed_control) / 2 ** (seed_index + 1), 0)
    };
    new_jellyfish.rotate_angle = new_jellyfish.rotate_speed * now_time % 360;

    new_frame += jellyfish_svg_maker(new_jellyfish, jellyfish_index);
  }

  main_svg.innerHTML = new_frame;

  requestAnimationFrame(main_function);
}

function jellyfish_svg_maker(jellyfish, index) {
  switch(jellyfish.type) {
    case 'jellyfish_8-4':
      return `<svg x="${jellyfish.central.x - jellyfish.radius * 4 / 3}" y="${jellyfish.central.y - jellyfish.radius * 4 / 3}" width="${jellyfish.radius * 8 / 3}" height="${jellyfish.radius * 8 / 3}" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient${index}" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${jellyfish.gradient.inner}"></stop>
            <stop offset="100%" stop-color="${jellyfish.gradient.outer}"></stop>
          </radialGradient>
          <g id="tentacles${index}" stroke-linecap="round">
            <line x1="128" y1="32" x2="128" y2="80"/>
            <line x1="128" y1="32" x2="128" y2="64" transform="rotate(45 128 128)"/>
          </g>
        </defs>
        <g stroke="url(#gradient${index})" stroke-width="16" transform="rotate(${jellyfish.rotate_angle} 128 128)">
          <circle cx="128" cy="128" fill="url(#gradient${index})" fill-opacity="${jellyfish.opacity}" r="96"/>
          <use href="#tentacles${index}"/>
          <use href="#tentacles${index}" transform="rotate(90 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(180 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(270 128 128)"/>
        </g>
      </svg>`;

    case 'jellyfish_12-4':
      return `<svg x="${jellyfish.central.x - jellyfish.radius * 4 / 3}" y="${jellyfish.central.y - jellyfish.radius * 4 / 3}" width="${jellyfish.radius * 8 / 3}" height="${jellyfish.radius * 8 / 3}" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient${index}" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${jellyfish.gradient.inner}"></stop>
            <stop offset="100%" stop-color="${jellyfish.gradient.outer}"></stop>
          </radialGradient>
          <g id="tentacles${index}" stroke-linecap="round">
            <line x1="128" y1="32" x2="128" y2="80"/>
            <line x1="128" y1="32" x2="128" y2="64" transform="rotate(30 128 128)"/>
            <line x1="128" y1="32" x2="128" y2="64" transform="rotate(60 128 128)"/>
          </g>
        </defs>
        <g stroke="url(#gradient${index})" stroke-width="16" transform="rotate(${jellyfish.rotate_angle} 128 128)">
          <circle cx="128" cy="128" fill="url(#gradient${index})" fill-opacity="${jellyfish.opacity}" r="96"/>
          <use href="#tentacles${index}"/>
          <use href="#tentacles${index}" transform="rotate(90 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(180 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(270 128 128)"/>
        </g>
      </svg>`;

    case 'jellyfish_12-6':
      return `<svg x="${jellyfish.central.x - jellyfish.radius * 4 / 3}" y="${jellyfish.central.y - jellyfish.radius * 4 / 3}" width="${jellyfish.radius * 8 / 3}" height="${jellyfish.radius * 8 / 3}" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient${index}" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${jellyfish.gradient.inner}"></stop>
            <stop offset="100%" stop-color="${jellyfish.gradient.outer}"></stop>
          </radialGradient>
          <g id="tentacles${index}" stroke-linecap="round">
            <line x1="128" y1="32" x2="128" y2="80"/>
            <line x1="128" y1="32" x2="128" y2="64" transform="rotate(30 128 128)"/>
          </g>
        </defs>
        <g stroke="url(#gradient${index})" stroke-width="16" transform="rotate(${jellyfish.rotate_angle} 128 128)">
          <circle cx="128" cy="128" fill="url(#gradient${index})" fill-opacity="${jellyfish.opacity}" r="96"/>
          <use href="#tentacles${index}"/>
          <use href="#tentacles${index}" transform="rotate(60 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(120 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(180 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(240 128 128)"/>
          <use href="#tentacles${index}" transform="rotate(300 128 128)"/>
        </g>
      </svg>`;

    default:
      return ``;
  }
}
