FROM envoyproxy/envoy:v1.25-latest

COPY ./envoy.yaml /etc/envoy/envoy.yaml
COPY ./protos /etc/envoy/protos 
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml
