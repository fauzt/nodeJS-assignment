loadtest -t 30 -c 10 --rps 100 http://localhost:8080/py/mult?x=5&y=25
loadtest -t 30 -c 10 --rps 500 http://localhost:8080/py/mult?x=5&y=25
loadtest -t 30 -c 10 --rps 1000 http://localhost:8080/py/mult?x=5&y=25