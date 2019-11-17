{ pkgs ? import <nixpkgs> {} }:

with pkgs;

pkgs.stdenv.mkDerivation {
  name = "serverlessEnvEnv";
  buildInputs = [
    nodejs-10_x
    yarn
  ];
}

