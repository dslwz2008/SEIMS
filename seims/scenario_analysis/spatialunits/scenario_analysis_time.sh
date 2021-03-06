#!/bin/bash
#SBATCH -p work
#SBATCH --time=5-00:00:00
#SBATCH --nodes=8
#SBATCH --ntasks=48
#SBATCH --job-name="timeext_scenario_analysis"

N_NODES=8
N_TASKS=48
python write_hostsfile.py -N $N_NODES -n $N_TASKS

# check if we were able to start writing the conf file
SCOOPHOST_FILE="hostname.txt"
if [ -f $SCOOPHOST_FILE ]; then
    echo "file created..."
else
    echo "$0: can't create $SCOOPHOST_FILE"
    exit 1
fi

python -m scoop --hostfile $SCOOPHOST_FILE -n $N_TASKS time_extended_nsga2.py -ini /GPUFS/igsnrr_czqin_2/shenshen/SEIMS/data/youwuzhen/workspace/scenario_analysis_time.ini

