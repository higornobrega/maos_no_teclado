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
    
if __name__ == '__main__':
    nome = input('Digite o Nome: ')
    idade = input('Digite a idade: ')
    sexo = input('Digite o sexo: ') #Masculino Feminino
    usr = (nome, int(idade), sexo)

    banco = DBConnection()

    banco.create_record(usr=usr)
    print(banco.record_query())

