FROM node:16.13.0-alpine as builder

ARG WORK_DIR=/frontend
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install @angular/cli@13.3.4
RUN npm install

COPY . ${WORK_DIR}

EXPOSE 4200
CMD ng serve --host 0.0.0.0
