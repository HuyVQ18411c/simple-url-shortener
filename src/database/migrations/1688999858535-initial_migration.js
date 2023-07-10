export class InitialMigration1688999858535 {
    name = 'InitialMigration1688999858535'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`links\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(128) NOT NULL, \`original\` text NOT NULL, \`filePath\` text NULL, \`expiredAt\` datetime NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userIp\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_54ebf5dec4e16cbf8f22d44cae\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_54ebf5dec4e16cbf8f22d44cae\` ON \`links\``);
        await queryRunner.query(`DROP TABLE \`links\``);
    }

}
