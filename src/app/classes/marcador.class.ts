// export class Marcador {
//     constructor( public lat: number, public lng: number) {}
// }

export class Marcador {
    public lat: number;
    public lng: number;
    public minDistance: string=" ";

    public titulo = 'Sin titulo';
    public descripcion = 'Sin descripcion';

    constructor( lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
        this.minDistance=" ";
    }
}
