export class TradesEntity {
	id: number;
	publicationDate: Date;
	description: string;
	product: string;
	pl: boolean;
	author: UserEntity;
	amout: number; 
	class:string;
	pictureUrl:string;
}

export class UserEntity {
	id: number;
	name: string;
	lastName: string;
	birth: Date;
	location: string;
	address: string; 
}
