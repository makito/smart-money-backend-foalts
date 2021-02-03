import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1612348831914 implements MigrationInterface {
    name = 'migration1612348831914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `wallets` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL DEFAULT '', `amount` float(10,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `wallets`");
    }

}
