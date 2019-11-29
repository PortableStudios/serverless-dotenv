{ pkgs ? import <nixpkgs> {} }:

with pkgs;

pkgs.stdenv.mkDerivation {
  name = "serverlessDotenvEnv";
  buildInputs = [
    nodejs-10_x
    yarn
  ];
}

