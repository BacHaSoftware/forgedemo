FROM node:10-stretch
COPY . /usr/src/bh_forge
WORKDIR /usr/src/bh_forge
RUN npm install

# ENV API_PORT 3001
EXPOSE 3000
CMD ["npm","start"]