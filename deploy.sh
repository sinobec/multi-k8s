docker build -t fourt/multi-client:latest -t fourt/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t fourt/multi-server:latest -t fourt/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t fourt/multi-worker:latest -t fourt/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push fourt/multi-client:latest
docker push fourt/multi-server:latest
docker push fourt/multi-worker:latest

docker push fourt/multi-client:$SHA
docker push fourt/multi-server:$SHA
docker push fourt/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=fourt/multi-server:$SHA
kubectl set image deployments/client-deployment client=fourt/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=fourt/multi-server:$SHA