FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get -qqy update \
  && apt-get -qqy --no-install-recommends install \
    libfontconfig \
    libfreetype6 \
    xfonts-cyrillic \
    xfonts-scalable \
    fonts-liberation \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-tlwg-loma-otf \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get -qyy clean
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
