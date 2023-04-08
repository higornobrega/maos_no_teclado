import sqlite3

class DBConnection:

    def __init__(self):
        self.con = sqlite3.connect('db.sqlite3')
        self.cur = self.con.cursor()

        self.crate_table()

    def crate_table(self):
        try:
            self.cur.execute('''CREATE TABLE IF NOT EXISTS Usuario (
                nome TEXT,
                idade INTEGER,
                sexo TEXT)''')
        except Exception as e:
            print(e)
        else:
            print('Sucess\n')

    def create_record(self, usr):
        try:
            self.cur.execute(
                '''INSERT INTO Usuario VALUES (?, ?, ?)''', usr)
        except Exception as e:
            print(e)
            self.con.rollback()
        else:
            self.con.commit()
            print('Sucess')


    def record_query(self, limit=10):

        return self.cur.execute('''SELECT * FROM Usuario LIMIT ?''', (limit,)).fetchall() 

    def read(self):
        return self.cur.execute('''SELECT * FROM Usuario''').fetchall()
    
    def edit(self, identificado, nome, idade, sexo):
        try:
            self.cur.execute(
                '''UPDATE Usuario SET nome=?, idade=?, sexo=? WHERE nome=?''', (nome, idade, sexo, identificado))
        except Exception as e:
            print(e)
            self.con.rollback()
        else:
            self.con.commit()
            print('Sucess')  
            

    def delete(self, nome):

        try:
            self.cur.execute(
                f'''DELETE FROM Usuario WHERE nome=?''', (nome,))
        except Exception as e:
            print(e)
            self.con.rollback()
        else:
            self.con.commit()
            print('sucess')
class Menu:
    def principal():
        opcao = input('- 1 para criar\n- 2 para editar\n- 3 para listar\n- 4 para apagar\n- 5 para sair\n') 
        return opcao
    def criar():
        nome = input('Digite o Nome: ')
        idade = input('Digite a idade: ')
        sexo = input('Digite o sexo: ')
        return [nome, idade, sexo]

if __name__ == '__main__':
    cont = True
    banco = DBConnection()
    while cont == True:
        opcao = Menu.principal()
        if opcao == '1':
            perfil = Menu.criar()
            usr = (perfil[0], perfil[1], perfil[2])
            banco.create_record(usr=usr)
        elif opcao == '2':
            identificado = input('Informe o nome do usuario que vai ser modificado : ')
            print('O que estiver certo repita e o que for mudar coloque a nova informação')
            perfil = Menu.criar()           
            banco.edit(identificado=identificado, nome=perfil[0], idade=perfil[1], sexo=perfil[2])
        elif opcao == '3':
            print(banco.read())
        elif opcao == '4':
            nome = input('Informe o Nome: ')
            banco.delete(nome)
        elif opcao == '5':
            cont = False
        else:
            print('Opção inválida')

