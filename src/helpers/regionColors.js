function getRegionColors(currentRegion){
    switch (currentRegion) {
        case 'Africa':
            return 'red';
        case 'Americas':
            return 'blue';
        case 'Asia':
            return 'yellow';
        case 'Europe':
            return 'green';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}

export default getRegionColors;
