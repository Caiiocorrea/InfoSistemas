export type Vehicle = {
	[key: string]: string[];
};

export type Carroceira = Vehicle;

export const vehicles: Vehicle = {
	leves: ['Toco', 'Vlc', 'Fiorino', '3/4'],
	medio: ['Truck', 'Bittruck'],
	pesado: ['Rodotrem', 'Vanderléia', 'Bitrem', 'Carreta LS', 'Carreta']
};

export const transportBody: Vehicle = {
	fechada: ['Baú', 'Baú frigorifico', 'Slider'],
	aberta: ['Caçamba', 'Grade baixa', 'Graneleiro'],
	especial: [
		'Bug porta container',
		'Munk',
		'Silo',
		'Tanque',
		'Gaiola',
		'Cegonha',
		'Apenas cavalo'
	]
};
